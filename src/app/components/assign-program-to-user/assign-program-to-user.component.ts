import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProgramToUserRequestPayload } from "src/app/common/program-to-user-payload-request";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-assign-program-to-user",
  templateUrl: "./assign-program-to-user.component.html",
  styleUrls: ["./assign-program-to-user.component.scss"],
})
export class AssignProgramToUserComponent implements OnInit {
  private baseUrl1 = "http://localhost:8080/api/programs/assignProgramToUser";
  programToUserRequestPayload: ProgramToUserRequestPayload;
  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private toastController: ToastController
  ) {
    this.programToUserRequestPayload = {
      programId: 0,
      username: "",
    };
  }
  programToUserForm: FormGroup;
  ngOnInit() {
    // this.route.paramMap.subscribe(() => {
    //   this.assignProgramToUser();
    // });
    this.programToUserForm = new FormGroup({
      programId: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required),
    });
  }
  assignProgramToUser() {
    console.log("data");
    const progId = this.programToUserForm.get("programId").value;
    const userName = this.programToUserForm.get("username").value;
    this.programToUserRequestPayload.programId = progId;
    this.programToUserRequestPayload.username = userName;
    this.httpClient
      .post<String>(`${this.baseUrl1}`, this.programToUserRequestPayload)
      .subscribe(
        (data) => {
          console.log("calling presentSuccessSaveToast with " + data);
          this.presentSuccessSaveToast(data);
        },
        (error) => {
          this.presentSuccessSaveToast("Some Error Occured");
        }
      );
  }
  async presentSuccessSaveToast(data: String) {
    const toast = await this.toastController.create({
      message: "" + data,
      duration: 2000,
    });
    toast.present();
  }
}
