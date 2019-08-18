import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    //retreving the ID
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      //checking if the user in the edit mode
      this.editMode = params["id"] != null;
      // console.log(this.editMode);
    });
  }
}
