import * as types from './itemlistTypes';

export function showCategoryListAction(itemtag) {
  return {
    type: types.GETLISTCATEGORY,
    itemtag,
  };
}

export function getDetailItemAction(itemId) {
  return {
    type: types.GETDETAILITEM,
    itemId,
  };
}

export function addToCart(itemId) {
  return {
    type: types.ADDTOCART,
    itemId,
  };
}
