import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import { addDoc, getDocs, query, collection } from 'firebase/firestore';

const Home = () => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const q = query(collection(dbService, 'nweets'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const nweetObj = {
        ...doc.data(),
        id: doc.id,
      };
      setNweets((prev) => [nweetObj, ...prev]);
    });
  };

  useEffect(() => {
    getNweets();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, 'nweets'), {
        nweet,
        createdAt: Date.now(),
      });
    } catch (error) {
      console.log(error);
    }
    setNweet('');
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweets(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={nweet}
          onChange={onChange}
          placeholder="Waht's on our mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.nweets}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
