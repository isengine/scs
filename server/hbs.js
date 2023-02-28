import hbs from 'hbs'

hbs.registerPartials('./view/partials', {
  rename: function (name) {
    return name.replace(/[^\w\-\.\/]/g, '_')
  }
})

export default hbs
