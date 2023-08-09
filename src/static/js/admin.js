const month_names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const EndpointRequest = async (url,payload) =>{
    let response = await fetch(url, payload)
  
    return response.json();
};
