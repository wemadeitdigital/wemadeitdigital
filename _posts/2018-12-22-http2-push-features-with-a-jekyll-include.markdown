---
layout: post
title: 'Implementing HTTP/2 push features with Jekyll sites'
date:   2018-12-22 20:00:55 +1300
categories: blog
comments: true
description: >-
  In this blog post we will teach you how to easily implement http/2 push features to reduce load time of vital site assets and improve overall experience for end-users visiting your site.
image:
  path: /assets/images/abstract-lines.jpg
  bg_class: bg-up
---
## Overview

HTTP/1 has it's problems such as uncompressed headers and head of line blocking. Due to this HTTP/2(.0) was developed by the Hypertext Transfer Protocol working group ([IETF](https://en.wikipedia.org/wiki/Internet_Engineering_Task_Force)) in __May 14, 2015__ to fix the underlying issues and improve the protocol that the World Wide Web relies on. 

### Server Push
One of the most awesome new features that HTTP/2 introduces is known as __Server Push__ which will allow you,as a developer, to specify assets the clients browser should retreive as soon as possible. These are added with either html `<link>` tags or `Link:` request headers (these can be added to .htaccess files for apache based web servers). You can view the offical w3.org documentation for Server Push [here](https://www.w3.org/TR/preload/#server-push-http-2).

#### Enablement of HTTP/2 features

When serving your websites assets over HTTP/2 & TLS you will be ranked higher by Google and other search engines due to the optimised performance that your site will offer it's visitors. Many web hosting companies already support HTTP/2 such as:

- [ionos.co.uk](https://www.ionos.co.uk/digitalguide/hosting/technical-matters/how-http2-optimizes-the-world-wide-web/)
- [Amazon Web Services - CloudFront](https://aws.amazon.com/about-aws/whats-new/2016/09/amazon-cloudfront-now-supports-http2/)


Get HTTP/2 enabled if you have not already done so! Then keep reading to get implementing in your static Jekyll site.

#### Preload
Developers that use HTTP/2 Server Push features can initiate an early load of assets using a __preload__ link.
You can add these as raw headers or as `<link>` tags, which is what we will will do for the Jekyll include. 

| Consumer | Preload Directive Example |
| -------- | ------------------------- |
| `<audio>` |	`<link rel=preload as=audio href=...>` |
| `<video>`	| `<link rel=preload as=video href=...>` |
| `<track>`	| `<link rel=preload as=track href=...>` |
| `<script>`, Worker's importScripts | `<link rel=preload as=script href=...>` |
| `<link rel=stylesheet>`, CSS `@import` | `<link rel=preload as=style href=...>` |
| CSS `@font-face` | `<link rel=preload as=font href=...>` |
| `<img>`, `<picture>`, `srcset`, `imageset`, SVG's, `<image>`, CSS `*-image` | `<link rel=preload as=image href=...>` |
| XHR, fetch | `<link rel=preload as=fetch crossorigin href=...>` |
| Worker, SharedWorker | `<link rel=preload as=worker href=...>` |
| `<embed>` | `<link rel=preload as=embed href=...>` |
| `<object>`	 | `<link rel=preload as=object href=...>` |
|`<iframe>`, `<frame>` | `<link rel=preload as=document href=...>` |
{:.table.table-dark}

##### Error Handling
You can handle errors that may occur when preloading assets with the following syntax:

```html
<!-- Inline javascript for preload event handlers. -->
<script>
  function preloadComplete(e) { 
    console.log(e);
   }
  function preloadFailed(e)  { 
    console.log(e);
   }
</script>
<!-- You can define onload/onerror HTML attributes which will fire a javascript function that you define. -->
<link rel="preload" href="bundle.js" as="script" onload="preloadComplete()" onerror="preloadFailed()">
```

## Jekyll Include for HTTP/2 features

So we all love the flexibilty/speed that static sites deliver and what's better than achieving the mystical Google PageSpeed Insights 100/100 score. Enabling Server Push features will help you achieve that score by reducing the page load time that users experience when downloading your website's content for the first time.

Jekyll websites can haver multiple static assets that your site needs to render correctly - some are need before others and Server Push can help with all resources. When creating a Jekyll site it's best to choose a central location for storing site details i.e `_config.yml` or `_data/settings-file-name.yml`. We will use this file for storing the site wide assets that are familar across multiple pages that you wish to add Server Push functionality to - these include things such as your main css/js bundled files, fonts and more. Then we will add the page specific resources which will be set in each pages `frontmatter`.

```html
{{"{%"}} comment %}
    Preload CSS Packages
{{"{%"}} endcomment %}
{{"{%"}} if page.css-package %}
    {{"{%"}} capture css-package %}/assets/css/main-{{page.css-package}}.css{{"{%"}} endcapture %}
    <link rel="preload" as="style" href="{{"{{"}}css-package | relative_url }}?v={{"{%"}} bust_cache %}">
{{"{%"}} elsif layout.css-package %}
    {{"{%"}} capture css-package %}/assets/css/main-{{layout.css-package}}.css{{"{%"}} endcapture %}
    <link rel="preload" as="style" href="{{"{{"}}css-package | relative_url }}?v={{"{%"}} bust_cache %}">
{{"{%"}} elsif layout.css-package == "main" or page.css-package == "main" %}
    <link rel="preload" as="style" href="{{"{{"}}"/assets/css/main.css" | relative_url }}?v={{"{%"}} bust_cache %}">
{{"{%"}} else %}
    <link rel="preload" as="style" href="{{"{{"}}"/assets/css/main.css" | relative_url }}?v={{"{%"}} bust_cache %}">
{{"{%"}} endif %}
{{"{%"}} comment %}
    Preload JS Packages
{{"{%"}} endcomment %}
{{"{%"}} if page.js-package %}
    {{"{%"}} capture js-package %}package-{{page.js-package}}{{"{%"}} endcapture %}
    <link rel="preload" as="script" href="{{"{%"}} asset_path {{js-package}} %}?v={{"{%"}} bust_cache %}">
{{"{%"}} elsif layout.js-package %}
    {{"{%"}} capture js-package %}package-{{layout.js-package}}{{"{%"}} endcapture %}
    <link rel="preload" as="script" href="{{"{%"}} asset_path {{js-package}} %}?v={{"{%"}} bust_cache %}">
{{"{%"}} else %}
    <link rel="preload" as="script" href="{{"{%"}} asset_path package %}?v={{"{%"}} bust_cache %}">
{{"{%"}} endif %}
{{"{%"}} comment %}
    Site Wide Http2 resources
{{"{%"}} endcomment %}
{{"{%"}} if site.data.settings.http2_resources %}
    {{"{%"}} for resource in site.data.settings.http2_resources %}
        <link rel="{{resource.rel}}" as="{{resource.as}}" href="{{"{{"}}resource.href}}" {{"{%"}} if resource.type %}type="{{resource.type}}"{{"{%"}} endif %}
        {{"{%"}} if resource.crossorigin %}crossorigin{{"{%"}} endif %}>
    {{"{%"}} endfor %}
{{"{%"}} endif %}
{{"{%"}} comment %}
    The following liquid checks the pages frontmatter for http2_resources list.
    Add all non-theme resources that you'd like to preload here.
{{"{%"}} endcomment %}
{{"{%"}} if page.http2_resources %}
    {{"{%"}} for resource in page.http2_resources %}
        <link rel="{{resource.rel}}" as="{{resource.as}}" href="{{"{{"}}resource.href}}" {{"{%"}} if resource.type %}type="{{resource.type}}"
            {{"{%"}} endif %} {{"{%"}} if resource.crossorigin %}crossorigin{{"{%"}} endif %}>
    {{"{%"}} endfor %}
{{"{%"}} endif %}
{{"{%"}} comment %}
    Jumbotron Background Image
{{"{%"}} endcomment %}
{{"{%"}} if page.jumbotron.background-image %}
    {{"{%"}} for resource in page.http2_resources %}
        <link rel="preload" as="image" href="{{"{{"}}page.jumbotron.background-image}}">
    {{"{%"}} endfor %}
{{"{%"}} endif %}
{{"{%"}} comment %}
    Jumbotron Carousel Images
{{"{%"}} endcomment %}
{{"{%"}} if page.jumbotron.carousel-images %}
    {{"{%"}} for image in page.jumbotron.carousel-images %}
        <link rel="preload" as="image" href="{{"{{"}}image}}">
    {{"{%"}} endfor %}
{{"{%"}} endif %}
{{"{%"}} comment %}
    Jumbotron Carousel Images
{{"{%"}} endcomment %}
{{"{%"}} if page.jumbotron.carousel-images %}
    {{"{%"}} for image in page.jumbotron.carousel-images %}
        <link rel="preload" as="image" href="{{"{{"}}image}}">
    {{"{%"}} endfor %}
{{"{%"}} endif %}
{{"{%"}} comment %}
    Jumbotron Video 
{{"{%"}} endcomment %}
{{"{%"}} if page.jumbotron.video.poster %}
    <link rel="preload" as="image" href="{{"{{"}}page.jumbotron.video.poster}}">
{{"{%"}} endif %}
{{"{%"}} if page.jumbotron.video.source.mp4 %}
    <link rel="preload" as="video" href="{{"{{"}}page.jumbotron.video.source.mp4}}">
{{"{%"}} endif %}
{{"{%"}} comment %}
    Blog Images 
{{"{%"}} endcomment %}
{{"{%"}} if page.image.featured %}
    {{"{%"}} if page.image.path %}
        <link rel="preload" as="image" href="{{"{{"}}page.image.path}}">
    {{"{%"}} endif %}
{{"{%"}} endif %}
```