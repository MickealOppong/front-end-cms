import axios from "axios";

export const customFetch = axios.create({
  baseURL: 'http://localhost:3000'
})

export const getFromLocalStorage = (item) => {
  return JSON.parse(localStorage.getItem(item))
}
export const saveToLocalStorage = (item, data) => {
  localStorage.setItem(item, JSON.stringify(data))
}

export const clearFromLocalStorage = (item) => {
  localStorage.removeItem(item)
}

export const formatPrice = (price) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(parseFloat(price))
  return formattedPrice;
}


export const formatPriceLocale = (price, iso, fx) => {
  const formattedPrice = new Intl.NumberFormat(iso, {
    style: 'currency',
    currency: iso
  }).format(parseFloat(price / fx).toFixed(2))
  return formattedPrice;
}

