import { Message } from './../interfaces/message';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  public message: string = '';
  public messages: string[];

  constructor(private messageService: MessageService) {
    this.messages = [];
  }

  ngOnInit() {
  }

  send() {
    console.log(`sending ${this.message}`);
    this.messageService.send(this.message)
      .subscribe( (response: Message) => this.messages.push(response.data.message));
  }
}
