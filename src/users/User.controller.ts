import { EmailService } from "../services/mail/mail.service";
import { Get, Route } from "tsoa";
import { container } from "tsyringe";

@Route("/")
export class UserConroller {
  private emailService = container.resolve(EmailService);
  @Get()
  getUser() {
    this.emailService.sendMail('lolo@io.in', 'helloo', '', {});
    return "amalu";
  }
}
