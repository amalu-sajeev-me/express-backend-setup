import { Get, Route } from "tsoa";

@Route("/")
export class UserConroller {
  @Get()
  getUser() {
    return "amalu";
  }
}
