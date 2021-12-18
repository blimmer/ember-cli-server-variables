import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class IndexController extends Controller {
  @service('serverVariables')
  serverVariablesService;

  get token() {
    return this.serverVariablesService.get('token');
  }
}
