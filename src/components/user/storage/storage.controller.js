export default class StorageController {
  /** @ngInject */
  constructor($scope, $state, $fetch, $translate) {
    Object.assign(this, {
      $scope, $state, $fetch, $translate
    });

    this.requesting = true;

    this.options = {
      chart: {
        color: ['#118AB2', '#EF476F'],
        type: 'pieChart',
        height: 500,
        x(d) {
          return d.key;
        },
        y(d) {
          return d.y;
        },
        showLabels: true,
        duration: 400,
        labelThreshold: 0.01,
        labelType: 'percent',
        donut: true,
      },
      formatGB: false,
    };

    this.getInfomation();
  }

  /**
   * Return Page to Bucket List.
   *
   * @return void
   */
  confirm() {
    this.$state.go('bucket');
  }

  getInfomation() {
    this.$fetch.get('/v1/user/state')
      .then(({data}) => {
        this.drawCanvas(data);
        this.requesting = false;
      });
  }

  drawCanvas(data) {
    const source = [
      'ACCOUNT.QUOTA_REMAIN',
      'ACCOUNT.QUOTA_USED',
      'ACCOUNT.QUOTA_TOTAL'
    ];
    this.$translate(source)
      .then(translate => {
        this.data = [
          {
            key: translate[source[0]],
            y: data.max_size_kb - data.total_size_kb
          },
          {
            key:translate[source[1]],
            y:data.total_size_kb
          }
        ];
        this.canvas = [
          {
            text:translate[source[2]],
            value: data.max_size_kb / 1024
          },
          {
            text:translate[source[0]],
            value: (data.max_size_kb - data.total_size_kb) / 1024
          }
        ];
      })
  }
}
