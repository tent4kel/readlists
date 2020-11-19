# Readlists

- Local dev `npm start`
- Prod build `npm run build`

## ToDos

Enhancements

- [ ] Setup shared proptypes
- [ ] write more tests for stuff in utils
- [ ] abstract shared CSS for different pages
- [ ] edit HTML on client
- [ ] Double check epub export with the old readlist epubs
- [ ] handling multiple error toasts in successions
- [ ] Validation of readlists
- [ ] Responsive
- [ ] Dark mode CSS
- [ ] Transitions
- [ ] Address the @TODO items
- [ ] Refactor handlers to be at bottom of hooks

## Draggable Items

index.html

```
 <script src="https://unpkg.com/get-size@2.0.3/get-size.js"></script>
    <script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/packery.pkgd.js"></script>
    <script src="/js/draggabilly.js"></script>
```

js file

```
useEffect(() => {
console.log(window.getSize);
    var slidesElem = document.querySelector(".articles");
    var slideSize = getSize(document.querySelector(".article"));
    var pckry = new Packery(slidesElem, {
      rowHeight: slideSize.outerHeight,
    });
    console.log(slideSize, slideSize.outerHeight);
    // get item elements
    var itemElems = pckry.getItemElements();
    // for each item...
    for (var i = 0, len = itemElems.length; i < len; i++) {
      var elem = itemElems[i];
      // make element draggable with Draggabilly
      var draggie = new Draggabilly(elem, {
        axis: "y",
      });
      // bind Draggabilly events to Packery
      pckry.bindDraggabillyEvents(draggie);
    }

    // re-sort DOM after item is positioned
    pckry.on("dragItemPositioned", function (draggedItem) {
      console.log("done dragging", draggedItem);
      const $el = draggedItem.element;
      const currentIndex = Number($el.getAttribute("data-index"));
      const article = readlist.articles[currentIndex];
      const newIndex = Array.prototype.indexOf.call(
        draggedItem.layout.items.map((item) => item.element),
        $el
      );
      console.log(currentIndex, newIndex);
      handleArticleOrdering({
        articleUrl: article.url,
        currentIndex,
        newIndex,
        setReadlist,
      });
      // console.log();
      // var nextItem = pckry.items[index + 1];
      // if (nextItem) {
      //   slidesElem.insertBefore(draggedItem.element, nextItem.element);
      // } else {
      //   slidesElem.appendChild(draggedItem.element);
      // }
    });
  })
```
