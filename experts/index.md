---
layout: default
title: Experts
class: experts
intro: >
  We know South Africa, like pretty well but we want to give you information you literally can’t find anywhere else… we’re talking about Insider knowledge.. The sort of “Gold” that tells you where the best place to get the best local street food, the sort of info that tells you about a unknown walk that ends ud at one of the best views in Cape Town. Meet the Team

experts:
  - name: bob
    description: >
      Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, sint consequuntur quisquam! Recusandae minus, ullam iure blanditiis laboriosam temporibus perspiciatis iste sint ipsum molestias. Dolores perspiciatis nam quae maxime nihil. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, sint consequuntur quisquam! Recusandae minus, ullam iure blanditiis laboriosam temporibus perspiciatis iste sint ipsum molestias. Dolores perspiciatis nam quae maxime nihil.

  - name: bill
    description: >
      Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, sint consequuntur quisquam! Recusandae minus, ullam iure blanditiis laboriosam temporibus perspiciatis iste sint ipsum molestias. Dolores perspiciatis nam quae maxime nihil. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, sint consequuntur quisquam! Recusandae minus, ullam iure blanditiis laboriosam temporibus perspiciatis iste sint ipsum molestias. Dolores perspiciatis nam quae maxime nihil.

  - name: fred
    description: >
      Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, sint consequuntur quisquam! Recusandae minus, ullam iure blanditiis laboriosam temporibus perspiciatis iste sint ipsum molestias. Dolores perspiciatis nam quae maxime nihil. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, sint consequuntur quisquam! Recusandae minus, ullam iure blanditiis laboriosam temporibus perspiciatis iste sint ipsum molestias. Dolores perspiciatis nam quae maxime nihil.

---

<div class="row intro intro--margin-bottom">
  <h1 class="intro__title">Meet The Experts</h1>
  <p class="intro__description">{{page.intro}}</p>
</div>

<div class="section row">
  <div class="page row--padding">
    {% assign page-experts = page.experts %}
    {% for expert in page-experts %}
      <div>
        <h3>{{expert.name}}</h3>
        <p>{{expert.description}}</p>
      </div>
    {% endfor %}
  </div>
</div>