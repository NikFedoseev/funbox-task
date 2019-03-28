class DragDrop {
  constructor(el, cb) {
    this.container = el;
    this.currentDrag = null;
    this.cb = cb;
    this.init();
  }

  init () {
    this.addEventsDragAndDrop(this.container)
  }

  dragStart (e) {
    const target = e.target;
    const list = target.closest('li');
    if (!list) return;
    list.style.opacity = 0.4;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', list.innerHTML);
    this.currentDrag = list;
  }

  dragDrop (e) {
    if (this.currentDrag != e.target) {
      this.currentDrag.innerHTML = e.target.innerHTML;
      e.target.innerHTML = e.dataTransfer.getData('text/html');
    }
  }

  dragEnd (e) {
    const list = e.target;
    list.style.opacity = 1;
    document.querySelectorAll('.list-item').forEach(el => el.classList.remove('list-item__over'))
    this.cb();
  }

  dragOver (e) {
    e.preventDefault();
  }

  dragEnter (e) {
    if(e.target === this.currentDrag) return
    e.target.classList.add('list-item__over');
  }

  dragLeave (e) {
    e.stopPropagation();
    e.target.classList.remove('list-item__over');
  }


  addEventsDragAndDrop(el) {
    el.addEventListener('dragenter', this.dragEnter.bind(this));
    el.addEventListener('dragstart', this.dragStart.bind(this));
    el.addEventListener('dragover', this.dragOver.bind(this));
    el.addEventListener('dragleave', this.dragLeave.bind(this));
    el.addEventListener('drop', this.dragDrop.bind(this));
    el.addEventListener('dragend', this.dragEnd.bind(this));
  }

}

export default DragDrop;