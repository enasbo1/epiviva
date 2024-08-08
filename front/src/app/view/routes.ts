export const  EpvPath={
  home: 'home',
  login:'login',
  logout:'logout',
  inscription:'inscription',
  visitor: {
    home:'visitor/home',
    candidate:'visitor/candidate',
    root:'visitor'
  },
  admin: {
    home:'admin/home',
    root:'admin'
  },
}

export const EpvRolePart:Record<string, string> = {
  "0":EpvPath.home,
  "1":EpvPath.visitor.root,
  "4":EpvPath.admin.root
}
