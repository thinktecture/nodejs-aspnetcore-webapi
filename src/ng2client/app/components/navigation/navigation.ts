import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({
    selector: 'nfn-navigation',
    templateUrl: 'app/components/navigation/navigation.html',
    styleUrls: ['app/components/navigation/navigation.css'],
    directives: [RouterLink]
})
export class NavigationComponent {

}
