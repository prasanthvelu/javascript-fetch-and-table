function fetchJson(status) {
  fetch("sample.json")
    .then(response => {
      return response.json()
    })
    .then(data => {
      if (data.length > 0) {
        if (status === "onLoad") {
          insertRows(data)
        } else {
          filterData(data, status)
        }
      } else {
        dataAvailableElement.style.display = "none"
        noDataAvailableElement.style.display = "block"
      }
    })
    .catch((error) => {
      dataAvailableElement.style.display = "none"
      alert("Unsuccessful")
    })
}
fetchJson("onLoad")

function filterData(data, status) {
  const filterdData = data.filter((currentValue) => {
    return currentValue.status === status.value
  })
  if (filterdData.length > 0) {
    dataStatus.innerHTML = `Showing for ${status.value}`
    insertRows(filterdData)
  } else {
    dataStatus.innerHTML = `No Data`
  }
}

const dataAvailableElement = document.querySelector('#data_available')
const noDataAvailableElement = document.querySelector('#no_data_available')
noDataAvailableElement.style.display = "none"

const dataStatus = document.querySelector('#data_status')
dataStatus.style.display = "none"

const myTable = document.querySelector('#my_table').querySelector('tbody');

function insertRows(data) {
  for (i = 0; i < data.length; i++) {
    const row = myTable.insertRow();
    row.insertCell(0).innerHTML = data[i].capsule_id;
    row.insertCell(1).innerHTML = data[i].missions
    row.insertCell(2).innerHTML = data[i].details
  }
}

document.querySelector("#load").addEventListener("click", () => {
  dataStatus.style.display = "none"
  myTable.innerHTML = ""
  const selectedElement = document.querySelector("#status")
  if (selectedElement.value === "") {
    alert("Please select status")
  } else {
    dataStatus.style.display = "block"
    fetchJson(selectedElement)
  }
})

