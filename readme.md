# '/api/categories'
  get '/:id' - get by id (item)
  get '/' - get all (list)
  put '/' - create new (item)
  post '/:id' - update (item)
  delete '/:id' - delete (item)


# '/api/cards'
  get '/' - get all (list)
  get '/:id' - get by id (item)
  get ''/category/:id' - get all where categoryId = id (list)
  put '/' - create new (item)
  post '/:id' - update (item)
  delete '/:id' - delete (item)


# '/api/reset'
  reset to defaults
