---
layout: page
title: Categories
permalink: /category/
---
<div>
{% for category in site.categories %}
    {% capture category_name %}{{ category | first }}{% endcapture %}

    <div class="content-post-category"> {{ category_name }} </div>
    <div class="content-post-block-shift">
    {% for post in site.categories[category_name] %}
        <div class="content-post-tag">{{ post.date | date_to_string }}&raquo;</div>
        <div class="content-post-title"><a href="{{ post.url }}">{{ post.title }}</a></div>
        <div class="content-post-clear"></div>
    {% endfor %}
    </div>
    <hr>
{% endfor %}
</div>
