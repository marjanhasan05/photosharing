import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useGuestId = (): string | null => {
  const [guestId, setGuestId] = useState<string | null>(null);

  useEffect(() => {
    let storedGuestId = localStorage.getItem("guestId");

    if (!storedGuestId) {
      storedGuestId = uuidv4();
      localStorage.setItem("guestId", storedGuestId);
    }

    setGuestId(storedGuestId);
  }, []);

  return guestId;
};

export default useGuestId;