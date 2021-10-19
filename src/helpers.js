exports.fetchData = async (fetchUrl) => {
  try {
    const res = await fetch(fetchUrl);
    if (res.ok) {
      const data = await res.json();
      return {
        status: 'success',
        data,
      };
    }

    throw new Error(res.statusText);
  }
  catch (error) {
    return {
      status: 'error',
      error,
    };
  }
};