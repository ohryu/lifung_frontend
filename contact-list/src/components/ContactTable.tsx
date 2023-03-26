import { useState } from "react";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import styled from "@emotion/styled";
import {Typography,
	FormControl,
	Select,
	MenuItem,
	TextField,
	InputLabel,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle 
} from "@mui/material";
import contactList from "../hooks/useContactList";
import { IContact } from "../types/IContactType";

const columns: GridColDef[] = [
	{
		field: "avatar_url",
		headerName: "Image",
		width: 200,
		sortable: false,
		renderCell: (e) => (
			<>
				<img width="100"	src={e.row.avatar} alt={e.row.avatar}/>
			</>
		),
	},
	{ field: "hero_name", headerName: "Hero Name", width: 250, sortable: false },

	{ field: "name", headerName: "Real Name", width: 250, sortable: false },
	{ field: "phone", headerName: "Phone Number", width: 120 }
];

const AppStyledProvider = styled.div`
	height: 650px;
	width: 90%;
	margin: auto;
`;


function ContactTable() {
	const [q, setQ] = useState("");
	const [searchParam] = useState(["name", "hero_name"]);
	const [filterParam, setFilterParam] = useState("All");
	const contacts = contactList();
	const [contact, setContact] = useState<IContact>(contacts[0]);
	const [showDialog, setShowDialog] = useState(false)

	const globalSearch = (): IContact[] => {
		
		const filteredContacts = contacts.filter((item) => {
			if (item.gender == filterParam) {
                return (
			 	item?.name?.toLowerCase().includes(q?.toLowerCase()) ||
			 	item?.hero_name?.toLowerCase().includes(q?.toLowerCase())
				);
            } else if (filterParam == "All") {
                return (
					item?.name?.toLowerCase().includes(q?.toLowerCase()) ||
					item?.hero_name?.toLowerCase().includes(q?.toLowerCase())
				   );
            }
		});
		return filteredContacts;
	};

	const filterContactList: IContact[] | [] = searchParam
		? globalSearch()
		: contacts;

	const handleRowClick: GridEventListener<'rowClick'> = (params) => {
		setContact(params.row);
		setShowDialog(true);
	};

	return (
		<AppStyledProvider>
			<Typography variant="h4" align="center">Contact List</Typography>
			<FormControl>
				<TextField
					value={q}
					onChange={(event) => setQ(event.target.value)}
					label="Search Contact"
					variant="outlined"
					sx={{
						marginBottom: 1
					}}
				/>
			</FormControl>
			<FormControl>
				<InputLabel id="gender-label"sx={{marginLeft: 1}}>Gender</InputLabel>
				<Select
					onChange={(event) => setFilterParam(event.target.value)}
					labelId="gender-label"
					label="Gender"
					defaultValue="All"
					sx={{
						marginLeft: 1,
						marginBottom: 1,
						width: 100
					}}
				>
					<MenuItem value="All">All</MenuItem>
					<MenuItem value="male">male</MenuItem>
					<MenuItem value="female">female</MenuItem>
				</Select>
			</FormControl>

			<DataGrid
				rows={filterContactList && filterContactList}
				columns={columns}
				pageSize={10}
				rowsPerPageOptions={[5]}
				onRowClick={handleRowClick} {...contacts}
			/>

			<Dialog
				open={showDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{contact.hero_name}
				</DialogTitle>
				<DialogContent>
					<img width="300" src={contact.avatar} alt={contact.avatar}/>
					<Typography variant="subtitle2">Name: {contact.name}</Typography>
					<Typography variant="subtitle2">Date Of Birth: {contact.dob}</Typography>
					<Typography variant="subtitle2">Gender: {contact.gender}</Typography>
					<Typography variant="subtitle2">Email: {contact.email}</Typography>
					<Typography variant="subtitle2">Phone: {contact.phone}</Typography>
					<Typography variant="subtitle2">Address: {contact.address}</Typography>
					<Typography variant="subtitle2">Description: {contact.detail}</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={(event) => setShowDialog(false)}>Close</Button>
				</DialogActions>
			</Dialog>
		</AppStyledProvider>
	);
}

export default ContactTable;
