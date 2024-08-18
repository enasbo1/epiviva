export const  EpvPath={
  home: 'home',
  login:'login',
  logout:'logout',
  options: 'options',
  inscription:'inscription',
  visitor: {
    home:'visitor/home',
    options: 'visitor/options',
    candidate:'visitor/candidate',
    benefit:'visitor/benefit',
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
    candidate:{
      list:'rh/candidate',
      details:'rh/candidate/:id'
    },
    root:'rh'
  },
  admin: {
    home:'admin/home',
    options: 'admin/options',
    services:{
      list:'admin/service',
      detail:'admin/service/:id',
      edit:'admin/service/:id/edit',
      new:'admin/service/new',
    },
    users:{
      list:'admin/users',
      detail:'admin/users/:id',
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
