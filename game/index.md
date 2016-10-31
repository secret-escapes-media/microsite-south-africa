---
layout: plain
title: Game
class: game
---

<style>
  li {
    font-size: 1.66em;
    padding: 1em 0;
    list-style-type: none !important;
  }
  label{
    display: block;
  }
  label:hover {
    background-color: grey;
    cursor: pointer;
  }
</style>

<div class="row"></div>
<div class="row row--padding">

  <a href="{{site.baseurl}}" class="btn" style="float:right;">Exit game</a>

  <h1>Would you rather?</h1>

  <ul>
    <li>
      <label for="lifestyle-adventure">
        <input id="lifestyle-adventure" type="radio" name="lifestyle" value="adventure" data-price-uk="2034" data-price-sa="987">
        Lifestyle Adventurous Activity
      </label>
      or
      <label for="lifestyle-luxury">
        <input id="lifestyle-luxury" type="radio" name="lifestyle" value="luxury" data-price-uk="2034" data-price-sa="987">
        Lifestyle Luxury Activity
      </label>
    </li>
    <li>
      <label for="fashion-adventure">
        <input id="fashion-adventure" type="radio" name="fashion" value="adventure" data-price-uk="2034" data-price-sa="987">
        Fashion Adventurous Activity
      </label>
      or
      <label for="fashion-luxury">
        <input id="fashion-luxury" type="radio" name="fashion" value="luxury" data-price-uk="2034" data-price-sa="987">
        Fashion Luxury Activity
      </label>
    </li>
    <li>
      <label for="music-adventure">
        <input id="music-adventure" type="radio"  name="music" value="adventure" data-price-uk="2034" data-price-sa="987">
        Music Adventurous Activity
      </label>
      or
      <label for="music-luxury">
        <input id="music-luxury" type="radio"  name="music" value="luxury" data-price-uk="2034" data-price-sa="987">
        Music Luxury Activity
      </label>
    </li>
    <li>
      <label for="adventure-adventure">
        <input id="adventure-adventure" type="radio" name="adventure" value="adventure" data-price-uk="2034" data-price-sa="987">
        Adventure Adventurous Activity
      </label>
      or
      <label for="adventure-luxury">
        <input id="adventure-luxury" type="radio" name="adventure" value="luxury" data-price-uk="2034" data-price-sa="987">
        Adventure Luxury Activity
      </label>
    </li>
    <li>
      <label for="food-adventure">
        <input id="food-adventure" type="radio" name="food" value="adventure" data-price-uk="2034" data-price-sa="987">
        Food Adventurous Activity
      </label>
      or
      <label for="food-luxury">
        <input id="food-luxury" type="radio" name="food" value="luxury" data-price-uk="2034" data-price-sa="987">
        Food Luxury Activity
      </label>
    </li>
  </ul>

  <a href="#" class="btn js-submit-choices">Sumbit Choices</a>
  <a href="#" class="btn js-reset-game">Reset Game</a>


</div>