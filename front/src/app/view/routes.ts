export const  EpvPath={
  home: 'home',
  login:'login',
  logout:'logout',
  _403_:'403',
  _404_:'404',
  options: 'options',
  inscription:'inscription',
  visitor: {
    home:'visitor/home',
    options: 'visitor/options',
    candidate:'visitor/candidate',
    gift:{
      root:'visitor/gift',
    },
    benefit:{
      root:'visitor/benefit',
      edit:'visitor/benefit/edit',
      detail:'visitor/benefit/detail'
    },
    candidated:{
      edit: 'visitor/candidated/:id/edit',
      list:'visitor/candidated',
      details:'visitor/candidated/:id'
    },
    services:{
      list:'visitor/service-list',
      detail:'visitor/service/:id'
    },
    addresses:'visitor/addresses',
    root:'visitor'
  },
  rh : {
    home:'rh/home',
    options: 'rh/options',
    sector:{
      list:'rh/sector',
      details:'rh/sector/:id'
    },
    gift:{
      list:'rh/gift',
      details:'rh/gift/:id',
    },
    benefit:{
      list:'rh/benefit',
      details:'rh/benefit/:id'
    },
    candidate:{
      list:'rh/candidate',
      details:'rh/candidate/:id'
    },
    volunteer:{
      list:'rh/volunteer',
      details:'rh/volunteer/:id'
    },
    root:'rh'
  },
  admin: {
    home:'admin/home',
    options: 'admin/options',
    services:{
      list:'admin/service',
      details:'admin/service/:id',
      edit:'admin/service/:id/edit',
      new:'admin/service/new'
    },
    users:{
      list:'admin/users',
      details:'admin/users/:id',
      edit:'admin/users/:id/edit',
    },
    root:'admin'
  },
}

export const EpvRolePart:Record<string, string> = {
  "0":EpvPath.home,
  "1":EpvPath.visitor.root,
  "3":EpvPath.rh.root,
  "4":EpvPath.admin.root
}
