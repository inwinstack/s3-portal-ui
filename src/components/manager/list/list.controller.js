export default class ManagerListController {
  /** @ngInject */
  constructor($scope, $manager,$timeout) {
    Object.assign(this, {
      $scope, $manager, $timeout
    });

    this.$scope.$watch(
      () => $manager.state.lists,
      newVal => {
        Object.assign(this, newVal);
      }
    , true);

    this.$scope.$watch(
      () => this.query.page,
      newVal => {
        this.$manager.setListIndex(newVal);
        this.currentIndexInitial = (this.query.page - 1)*10 + 1;
        this.currentIndexEnd = (this.maxPageNumber === this.query.page) ? this.data.count : this.query.page*10;
      }
    ,true);

    this.query = {
      order: 'name',
      limit: 10,
      page: 1
    };
    // default sort order by name,what page number is it and limit row options

    this.query.pageOptions = [];

    this.$manager.getAccounts()
      .then( (data) => {
        this.maxPageNumber = Math.ceil(data.count / 10);
        for(let i = 1 ; i <= this.maxPageNumber ; i++) {
            this.query.pageOptions[i-1] = i;
        }
      }
    );

    this.limitOptions = [5, 10, 15];
    // limit rows per page
  }

 toggleLimitOptions() {
   // if no defination of limit options, this will auto define limit options
    this.limitOptions = this.limitOptions ? undefined : [5, 10, 15];
  };

  nextPageNumber() {
    if ( this.maxPageNumber > this.query.page ) this.query.page++;
  }

  previousPageNumber() {
    if (this.query.page > 1) this.query.page--;
  }

  firstPageNumber() {
    this.query.page = 1;
  }

  lastPageNumber() {
    this.query.page = this.maxPageNumber;
  }

  selectAccount(account) {
    this.$manager.selectAccount(account.id);
  }

  createQuotaSettingDiag($event, user) {
    this.$manager.createQuotaSettingDiag($event, user);
  }

  refresh() {
    this.$manager.getAccounts();
  }
}
