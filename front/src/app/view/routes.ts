export const  EpvPath={
  home: 'home',
  login:'login',
  logout:'logout',
  inscription:'inscription',
  visitor: {
    home:'visitor/home',
    candidate:'visitor/candidate',
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
    candidate:{
      list:'rh/candidate',
      details:'rh/candidate/:id'
    },
    root:'rh'
  },
  admin: {
    home:'admin/home',
    root:'admin'
  },
}

export const EpvRolePart:Record<string, string> = {
  "0":EpvPath.home,
  "1":EpvPath.visitor.root,
  "3":EpvPath.rh.root,
  "4":EpvPath.admin.root
}
