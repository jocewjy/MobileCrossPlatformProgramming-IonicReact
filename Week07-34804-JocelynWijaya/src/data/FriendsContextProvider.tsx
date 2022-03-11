import React, { useState } from 'react';
import FriendsContext, { Friend } from './friend-context';

const FriendsContextProvider: React.FC = props => {
	const [friends, setFriends] = useState<Friend[]>([
		{ id: 'f1', name: 'John Thor', avatar: 'https://assets.promediateknologi.com/crop/0x0:0x0/x/photo/2021/09/10/3357968484.jpg' },
    	{ id: 'f2', name: 'John Ness', avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Hoaxed_photo_of_the_Loch_Ness_monster.jpg/230px-Hoaxed_photo_of_the_Loch_Ness_monster.jpg' },
    	{ id: 'f3', name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1522787126632-aa89815837ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9lfGVufDB8fDB8fA%3D%3D&w=1000&q=80' }
	]);

	const addFriend = (name: string, avatar: string) => {
		const newFriend: Friend = {
			id: Math.random().toString(),
			name: name,
			avatar: avatar
		};

		setFriends(currFriends => {
			return currFriends.concat(newFriend);
		});
	};

	const updateFriend = (id: string, name: string, avatar: string) => {
		const newFriend: Friend = {
			id: id,
			name: name,
			avatar: avatar
		};

		var ctr = 0;
		var isFound = false;

		friends.forEach(friend => {
			if (friend.id === id) isFound = true;
			else {
				if (!isFound) ctr++;
			}
		});

		friends.splice(ctr, 1, newFriend);
	};

	const deleteFriend = (id: string) => {
		setFriends(friends.filter(friend => friend.id != id));
	};

	return (
		<FriendsContext.Provider
			value={{
				friends,
				addFriend,
				updateFriend,
				deleteFriend,
			}}
		>
			{props.children}
		</FriendsContext.Provider>
	);
};

export default FriendsContextProvider;
