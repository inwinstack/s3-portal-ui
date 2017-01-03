export default class StorageController {
  /** @ngInject */
  constructor($scope, $state) {
    Object.assign(this, {
      $scope, $state,
    });

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

    this.data = [
      {
        key: 'Remaining',
        y: 5000,
      },
      {
        key: 'Used',
        y: 2000,
      },
    ];

    this.mockData = [
      {
        text: 'Total Storage',
        value: this.data[0].y + this.data[1].y,
      },
      {
        text: 'Remaining Storage',
        value: this.data[0].y,
      },
    ];

    this.mockData = this.mockData.map((x) => {
      const object = {};
      object.text = x.text;
      object.value = x.value;
      object.formatValue = Math.round(object.value / 1024 * 100) / 100;
      return object;
    });
  }

  /**
   * Return Page to Bucket List.
   *
   * @return void
   */
  confirm() {
    this.$state.go('bucket');
  }
}
