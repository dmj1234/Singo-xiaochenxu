Component({
  properties: {
    tabs: {
      type: Array,
      value: []
    }
  },
  data: {
  },
  methods: {
    handleItemTap(e) {
      const { index } = e.currentTarget.dataset;
      let { tabs } = this.data;
      this.triggerEvent('itemChange', {index})
      tabs.forEach((item, i) => item.isActive = index === i ? true : false);
      this.setData({
        tabs
      })
    }
  }
})
