import _ from 'lodash'

const FilterUtils ={
    createUrl(params) {
        let searchParams = new URLSearchParams('');
        let pathname = window.location.pathname;
        if (!searchParams.has('pageNo')) {
          searchParams.append('pageNo', 1);
        }
        _.forOwn(params, function (val, key) {
          if (key !== 'pageNo') {
            searchParams.append(key, val);
          } else {
            let url = new URL(window.location.href);
            searchParams = new URLSearchParams(url.search);
            searchParams.set(key, val);
          }
        });
        return pathname + '?' + searchParams.toString();
      },
      removeUrl(dataIndex) {
        let pathname = window.location.pathname;
        let url = new URL(window.location.href);
        let searchParams = new URLSearchParams(url.search);
        if (searchParams.has(dataIndex)) {
          searchParams.delete(dataIndex);
        }
        return pathname + '?' + searchParams.toString();
      },
}

export default FilterUtils;
