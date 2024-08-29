import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {NavLink} from "../navLink";
import {GlobalService} from "../../shared/global.service";
import {Router} from "@angular/router";
import {EpvPath} from "../../view/routes";

@Component({
  selector: 'epv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() pageTitle?: string;
  options:string = EpvPath.options;
  home: string  = EpvPath.home;


  navLinks : NavLink[] = [
    {
      name : "nav.home",
      link : EpvPath.home
    }

  ];

  parts : Record<string, string> = {
    "partie-visiteur":"visitor"
  }

  keys : string[]=[
    'partie-visiteur',
    'partie-admin'
  ]

  logoUrl:string = "assets/images/logo.svg";
  constructor(
    protected router:Router
  ) { }

  ngOnInit(): void {
  }

  is_part(path:string):boolean{
    const path_cut = path.split('/')
    const current_cut = document.location.pathname.split('/')
    for (let i=0; i<path_cut.length; ++i) {
      if (path_cut[i]!==current_cut[i+1]){
        return false;
      }
    }
    return true;
  }

  change_part(value:string):void{
    this.router.navigateByUrl(this.parts[value]).then();
  }

  link(path:string){
    this.router.navigateByUrl(path).then();
  }

  protected readonly GlobalService = GlobalService;
  protected readonly WpPath= EpvPath;
}
