import { Moment } from "moment"

class Computer {
    name: string
    intrDate: Moment
    discDate: Moment
    company:string 
    
    constructor(name: string, intrDate: any, discDate: any, company: string) {
      this.name = name
      this.intrDate = intrDate
      this.discDate = discDate
      this.company = company
    }

}
export default Computer