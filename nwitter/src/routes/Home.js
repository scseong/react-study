import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import { addDoc, onSnapshot, query, collection } from 'firebase/firestore';
import Nweet from 'components/Nweet';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    const q = query(collection(dbService, 'nweets'));
    onSnapshot(q, (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, 'nweets'), {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
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
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={nweet}
          onChange={onChange}
          placeholder="What's on our mind?"
          maxLength={120}
        />
        <input type="submit" value="nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
