import React, { useState } from "react";

export interface StatusType {
    error: boolean;
    loading: boolean;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const useStatus = (): StatusType => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  return { loading, setLoading, error, setError };
};

export default useStatus;
