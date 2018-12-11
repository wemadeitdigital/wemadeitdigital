---
title: Contact Us
permalink: /contact/
layout: page
published: true
title: Contact Us
description: >-
  WeMadeIt.Digital can help your startup/business today. Get in touch with our friendly team to find out how.
image:
    name: cambridge.png
    bg_class: bg-up
    path: /assets/images/cambridge.png
seo:
    name: Contact WeMadeIt.Digital
    type: Organization
services:
    - Website Design
    - Website Development
    - Graphic Design
    - Sound Engineering
    - Marketing Management
    - Business Management
    - Business Continuity / Disaster Recovery
    - People Management
    - Employee Training / Assertiveness Courses
    - Expert Tuition
---
<form action="https://formspree.io/team@wemadeit.digital" method="POST">
  <div class="form-group">
    <label for="exampleFormControlInput1">Your Name</label>
    <input type="text" name="name" class="form-control form-control-lg" id="exampleFormControlInput1" placeholder="E.g Richard Branson">
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Your Email</label>
    <input type="email" name="email" class="form-control form-control-lg" id="exampleFormControlInput1" placeholder="E.g name@example.com">
  </div>
<div class="form-group">
    <label for="exampleFormControlInput1">Services you are interested in:</label>
    <br>
  {% for service in page.services %}
    <div class="form-check form-check-inline form-control-lg">
    <input class="form-check-input" type="checkbox" name="services" id="{{service}}" value="option1">
    <label class="form-check-label" for="{{service}}">{{service}}</label>
    </div>
  {% endfor %}
</div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Message</label>
    <textarea name="message" placeholder="Please tell us what you need help with..." class="form-control form-control-lg" id="exampleFormControlTextarea1" rows="5"></textarea>
  </div>
  <button type="reset" class="btn btn-danger btn-sm">Reset form</button>
  <button type="submit" class="btn btn-primary btn-lg float-right">Submit</button>
</form>
<br>