---
layout: post
title: 'Implementing HTTP/2 push features with Jekyll sites'
date:   2018-12-22 20:00:55 +1300
categories: blog
description: >-
  In this blog post we will teach you how to easily implement http/2 push features to reduce load time of vital site assets and improve overall experience for end-users visiting your site.
image:
  path: /assets/images/http2-push-features.png
  bg_class: bg-up
---
HTTP/1 has it's problems such as uncompressed headers and head of line blocking. Due to this HTTP/2(.0) was developed by the Hypertext Transfer Protocol working group ([IETF](https://en.wikipedia.org/wiki/Internet_Engineering_Task_Force)) in __May 14, 2015__ to fix the underlying issues and improve the protocol that the World Wide Web relies on. 

## Server Push
One of the most awesome new features that HTTP/2 introduces is known as __Server Push__ which will allow you,as a developer, to specify assets the clients browser should retreive as soon as possible. These are added with either html `<link>` tags or `Link:` request headers (these can be added to .htaccess files for apache based web servers). You can view the offical w3.org documentation for Server Push [here](https://www.w3.org/TR/preload/#server-push-http-2).

### Enablement of HTTP/2 features

When serving your websites assets over HTTP/2 & TLS you will be ranked higher by Google and other search engines due to the optimised performance that your site will offer it's visitors. Many web hosting companies already support HTTP/2 such as:

- [ionos.co.uk](https://www.ionos.co.uk/digitalguide/hosting/technical-matters/how-http2-optimizes-the-world-wide-web/)
- [Amazon Web Services - CloudFront](https://aws.amazon.com/about-aws/whats-new/2016/09/amazon-cloudfront-now-supports-http2/)


Get HTTP/2 enabled if you have not already done so! Then keep reading to get implementing in your static Jekyll site.

### Preload
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

#### Error Handling
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




Aside from solving common HTTP/1 performance problems (e.g., head of line blocking and uncompressed headers), HTTP/2 also gives us server push! Server push allows you to send site assets to the user before they’ve even asked for them. It’s an elegant way to achieve the performance benefits of HTTP/1 optimization practices such as inlining, but without the drawbacks that come with that practice.

In this article, you’ll learn all about server push, from how it works to the problems it solves. You’ll also learn how to use it, how to tell if it’s working, and its impact on performance. Let’s begin!