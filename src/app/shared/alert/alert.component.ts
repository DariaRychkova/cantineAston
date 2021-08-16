import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent{
    @Input() message: string;
    @Output() close = new EventEmitter<void>();

    // Emit an event catched in the auth.component.html to close this component
    onClose() {
        this.close.emit();
    }
}