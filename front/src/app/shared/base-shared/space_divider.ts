export class Space_divider{
  divide_space(nb_element:number):string{
    let ret: string = "col-12";
    let j = 0;
    const n:string[]=["sm","md","lg"]
    for(let i=0; i<3; ++i){
      j = i+2;
      if (nb_element>=j){
        ret+= " col-"+n[i]+"-"+(12/j);
      }
    }
    return ret;
  }
}
