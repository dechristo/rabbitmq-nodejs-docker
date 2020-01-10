import { Response } from '../interfaces/Response';
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

  sendHTTP() {
    const today = new Date();
    const now = today.toLocaleDateString() + ' ' + today.toLocaleTimeString();

    this.messages.push('[' + now  + '] ->> ' + this.message);
    this.messageService.sendHttp(this.message)
      .subscribe( (response: Response) => this.messages.push('[' + now + '] <-- ' + response.data.message));
  }

  sendAMQP() {
    const today = new Date();
    const now = today.toLocaleDateString() + ' ' + today.toLocaleTimeString();
    this.messages.push('[' + now + '] ->> ' + this.message);
    this.messageService.sendAMQP(this.message)
      .subscribe( (response: Response) => this.messages.push('[' + now + '] <-- ' + response.data.message));
  }
}
