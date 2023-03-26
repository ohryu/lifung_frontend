import { IContact } from "../types/IContactType";
import { contacts } from './contacts';

const contactList = (): IContact[] => {
	const contactList = contacts.map(contact =>{
		return {
			id: contact.id,
			hero_name: contact.hero_name,
			name: contact.name,
			dob: contact.dob,
			email: contact.email,
			phone: contact.phone,
			address: contact.address,
			avatar: contact.avatar,
			detail: contact.detail,
			gender: contact.gender
		} as IContact;
	});


	return contactList;
};

export default contactList;
