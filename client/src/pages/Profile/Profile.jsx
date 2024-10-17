import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import Badge from "@mui/material/Badge";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeInfo, updateEmployeeInfo } from "../../store/profileSlice/profile.thunk";
import "./profile.scss";
import { STATES } from "../../store/constant";
import FormControl from "@mui/material/FormControl";

const Profile = () => {
    const dispatch = useDispatch();
    const { info, loading, error } = useSelector((state) => state.profile);
    const { userId } = useSelector((state) => state.user);

    useEffect(() => {
        const formData = { userId };
        dispatch(fetchEmployeeInfo(formData));
    }, [dispatch]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <section>
            <header>
                <h1 className="title">My Profile</h1>
            </header>
            <Stack spacing={2}>
                <AvatarSection info={info} userId={userId} />
                <PersonalSection info={info} userId={userId} />
                <AddressSection info={info} userId={userId} />
                <ContactSection info={info} userId={userId} />
                <EmploymentSetcion info={info} userId={userId} />
                <EmergencySection info={info} userId={userId} />
            </Stack>
            <div className="profile-container"></div>
        </section>
    );
};

const AvatarSection = ({ info, userId }) => {
    const handleChange = () => {
        console.log(12);
    };
    return (
        <div className="outlined-container flex-row g-2">
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={<DriveFileRenameOutlineOutlinedIcon sx={{ cursor: "pointer" }} onClick={handleChange} />}
            >
                <Avatar alt="Travis Howard" src={info.image} sx={{ width: 100, height: 100 }} />
            </Badge>
            <div className="infos flex-col justify-between">
                <div className="name">
                    {info.preferedName || info.firstName} {info.lastName}
                </div>
                <div>Role: {info.role}</div>
                <div>Email: {info.email}</div>
                <div>Birth: {info.birth}</div>
            </div>
        </div>
    );
};

const PersonalSection = ({ info, userId }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(info);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        setFormData(info);
    }, [info]);

    const handleChange = (key) => {
        return (event) => {
            const value = event.target.value;
            setFormData((prev) => ({ ...prev, [key]: value }));
        };
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateEmployeeInfo({ userId, updateData: formData }));
        setEdit(false);
    };

    return (
        <div className="outlined-container">
            <div className="title">Personal Information</div>
            {edit ? (
                <>
                    <div className="buttons">
                        <Button
                            variant="outlined"
                            color="error"
                            endIcon={<CancelOutlinedIcon />}
                            onClick={() => {
                                setEdit(false);
                                setFormData(info);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button variant="outlined" endIcon={<SaveAsOutlinedIcon />} onClick={handleSubmit}>
                            Save
                        </Button>
                    </div>
                    <form className="input-container">
                        <label className="input-item">
                            First Name
                            <TextField
                                required
                                id="standard-required"
                                value={formData?.firstName || ""}
                                onChange={handleChange("firstName")}
                                variant="standard"
                            />
                        </label>
                        <label className="input-item">
                            Middle Name
                            <TextField
                                id="standard-required"
                                value={formData?.middleName || ""}
                                onChange={handleChange("middleName")}
                                variant="standard"
                            />
                        </label>
                        <label className="input-item">
                            Last Name
                            <TextField
                                required
                                id="standard-required"
                                value={formData?.lastName || ""}
                                onChange={handleChange("lastName")}
                                variant="standard"
                            />
                        </label>
                        <label className="input-item">
                            Prefered Name
                            <TextField
                                id="standard-required"
                                value={formData?.preferedName || ""}
                                onChange={handleChange("preferedName")}
                                variant="standard"
                            />
                        </label>
                        <label className="input-item">
                            Email Address
                            <TextField
                                required
                                id="standard-required"
                                value={formData?.email || ""}
                                onChange={handleChange("email")}
                                variant="standard"
                            />
                        </label>
                        <label className="input-item">
                            Social Security Number
                            <TextField
                                required
                                id="standard-required"
                                value={formData?.ssn || ""}
                                onChange={handleChange("ssn")}
                                variant="standard"
                            />
                        </label>
                        <label className="input-item">
                            Date of Birth
                            <TextField
                                required
                                id="standard-required"
                                value={formData?.birth || ""}
                                onChange={handleChange("birth")}
                                variant="standard"
                            />
                        </label>
                        <label className="input-item">
                            Gender
                            <TextField
                                required
                                id="standard-required"
                                value={formData?.gender || ""}
                                onChange={handleChange("gender")}
                                variant="standard"
                            />
                        </label>
                    </form>
                </>
            ) : (
                <>
                    <div className="buttons">
                        <Button variant="outlined" endIcon={<DriveFileRenameOutlineOutlinedIcon />} onClick={() => setEdit(true)}>
                            Edit
                        </Button>
                    </div>
                    <div className="view-container">
                        <label className="view-item">
                            First Name
                            <span>{info?.firstName}</span>
                        </label>
                        <label className="view-item">
                            Middle Name
                            <span>{info?.middleName}</span>
                        </label>
                        <label className="view-item">
                            Last Name
                            <span>{info?.lastName}</span>
                        </label>
                        <label className="view-item">
                            Prefered Name
                            <span>{info?.preferedName}</span>
                        </label>
                        <label className="view-item">
                            Email Address
                            <span>{info?.email}</span>
                        </label>
                        <label className="view-item">
                            Social Security Number
                            <span>{info?.ssn}</span>
                        </label>
                        <label className="view-item">
                            Date of Birth
                            <span>{info?.birth}</span>
                        </label>
                        <label className="view-item">
                            Gender
                            <span>{info?.gender}</span>
                        </label>
                    </div>
                </>
            )}
        </div>
    );
};

const AddressSection = ({ info, userId }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(info);
    const [edit, setEdit] = useState(false);

    const handleChange = (key) => {
        return (event) => {
            const value = event.target.value;

            if (key.includes(".")) {
                const keys = key.split(".");
                setFormData((prev) => {
                    return {
                        ...prev,
                        [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
                    };
                });
            } else {
                setFormData((prev) => ({ ...prev, [key]: value }));
            }
        };
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateEmployeeInfo({ userId, updateData: formData }));
        setEdit(false);
    };

    return (
        <div className="outlined-container">
            <div className="title">Address</div>
            {edit ? (
                <>
                    <div className="buttons">
                        <Button
                            variant="outlined"
                            color="error"
                            endIcon={<CancelOutlinedIcon />}
                            onClick={() => {
                                setEdit(false);
                                setFormData(info);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button variant="outlined" endIcon={<SaveAsOutlinedIcon />} onClick={handleSubmit}>
                            Save
                        </Button>
                    </div>
                    <form className="input-container">
                        <label className="input-item">
                            Building/Apt #
                            <TextField
                                required
                                id="standard-required"
                                value={formData?.address?.buildingOrAptNumber || ""}
                                onChange={handleChange("address.buildingOrAptNumber")}
                                variant="standard"
                            />
                        </label>
                        <label className="input-item">
                            Street
                            <TextField
                                required
                                id="standard-required"
                                value={formData?.address?.street || ""}
                                onChange={handleChange("address.street")}
                                variant="standard"
                            />
                        </label>
                        <label className="input-item">
                            City
                            <TextField
                                required
                                id="standard-required"
                                value={formData?.address?.city || ""}
                                onChange={handleChange("address.city")}
                                variant="standard"
                            />
                        </label>
                        <label className="input-item">
                            State
                            <FormControl sx={{ minWidth: 120 }} variant="standard" size="small">
                                <Select label="state" value={formData?.address?.state || ""} onChange={handleChange("address.state")}>
                                    {STATES.map((state) => (
                                        <MenuItem key={state.code} value={state.code}>
                                            {state.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </label>
                        <label className="input-item">
                            Zipcode
                            <TextField
                                required
                                id="standard-required"
                                value={formData?.address?.zipcode || ""}
                                onChange={handleChange("address.zipcode")}
                                variant="standard"
                            />
                        </label>
                    </form>
                </>
            ) : (
                <>
                    <div className="buttons">
                        <Button variant="outlined" endIcon={<DriveFileRenameOutlineOutlinedIcon />} onClick={() => setEdit(true)}>
                            Edit
                        </Button>
                    </div>
                    <div className="view-container">
                        <label className="view-item">
                            Building/Apt #<span>{info?.address?.buildingOrAptNumber}</span>
                        </label>
                        <label className="view-item">
                            Street<span>{info?.address?.street}</span>
                        </label>
                        <label className="view-item">
                            City<span>{info?.address?.city}</span>
                        </label>
                        <label className="view-item">
                            State<span>{info?.address?.state}</span>
                        </label>
                        <label className="view-item">
                            Zipcode<span>{info?.address?.zipcode}</span>
                        </label>
                    </div>
                </>
            )}
        </div>
    );
};

const ContactSection = ({ info, userId }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(info);
    const [edit, setEdit] = useState(false);
    const handleChange = (key) => {
        return (event) => {
            const value = event.target.value;
            setFormData((prev) => ({ ...prev, [key]: value }));
        };
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateEmployeeInfo({ userId, updateData: formData }));
        setEdit(false);
    };

    return (
        <div className="outlined-container">
            <div className="title">Contact</div>
            {edit ? (
                <>
                    <div className="buttons">
                        <Button
                            variant="outlined"
                            color="error"
                            endIcon={<CancelOutlinedIcon />}
                            onClick={() => {
                                setEdit(false);
                                setFormData(info);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button variant="outlined" endIcon={<SaveAsOutlinedIcon />} onClick={handleSubmit}>
                            Save
                        </Button>
                    </div>
                    <form className="input-container">
                        <label className="input-item">
                            Cell Phone Number
                            <TextField
                                required
                                id="standard-required"
                                value={formData?.cellPhone || ""}
                                onChange={handleChange("cellPhone")}
                                variant="standard"
                            />
                        </label>
                        <label className="input-item">
                            Work Phone Number
                            <TextField
                                required
                                id="standard-required"
                                value={formData?.workPhone || ""}
                                onChange={handleChange("workPhone")}
                                variant="standard"
                            />
                        </label>
                    </form>
                </>
            ) : (
                <>
                    <div className="buttons">
                        <Button variant="outlined" endIcon={<DriveFileRenameOutlineOutlinedIcon />} onClick={() => setEdit(true)}>
                            Edit
                        </Button>
                    </div>
                    <div className="view-container">
                        <label className="view-item">
                            Cell Phone Number
                            <span>{info?.cellPhone}</span>
                        </label>
                        <label className="view-item">
                            Work Phone Number
                            <span>{info?.workPhone}</span>
                        </label>
                    </div>
                </>
            )}
        </div>
    );
};

const EmploymentSetcion = ({ info, userId }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(info);
    const [edit, setEdit] = useState(false);
    const handleChange = (key) => {
        return (event) => {
            const value = event.target.value;
            setFormData((prev) => ({ ...prev, [key]: value }));
        };
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateEmployeeInfo({ userId, updateData: formData }));
        setEdit(false);
    };

    return (
        <div className="outlined-container">
            <div className="title">Employment</div>
            {edit ? (
                <>
                    <div className="buttons">
                        <Button
                            variant="outlined"
                            color="error"
                            endIcon={<CancelOutlinedIcon />}
                            onClick={() => {
                                setEdit(false);
                                setFormData(info);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button variant="outlined" endIcon={<SaveAsOutlinedIcon />} onClick={handleSubmit}>
                            Save
                        </Button>
                    </div>
                    <form className="input-container">
                        <label className="input-item">
                            First Name
                            <TextField
                                required
                                id="standard-required"
                                value={formData?.firstName || ""}
                                onChange={handleChange("firstName")}
                                variant="standard"
                            />
                        </label>
                    </form>
                </>
            ) : (
                <>
                    <div className="buttons">
                        <Button variant="outlined" endIcon={<DriveFileRenameOutlineOutlinedIcon />} onClick={() => setEdit(true)}>
                            Edit
                        </Button>
                    </div>
                    <div className="view-container">
                        <label className="view-item">
                            Visa Title
                            <span>{info?.firstName}</span>
                        </label>
                        <label className="view-item">
                            Start Date
                            <span>{info?.firstName}</span>
                        </label>
                        <label className="view-item">
                            End Date
                            <span>{info?.firstName}</span>
                        </label>
                    </div>
                </>
            )}
        </div>
    );
};

const EmergencySection = ({ info, userId }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(info);
    const [edit, setEdit] = useState(false);

    const handleChange = (key) => {
        return (event) => {
            const value = event.target.value;

            if (key.includes(".")) {
                const keys = key.split(".");
                setFormData((prev) => {
                    return {
                        ...prev,
                        [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
                    };
                });
            } else {
                setFormData((prev) => ({ ...prev, [key]: value }));
            }
        };
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateEmployeeInfo({ userId, updateData: formData }));
        setEdit(false);
    };

    return (
        <div className="outlined-container">
            <div className="title">Emergency Contact</div>
            {edit ? (
                <>
                    <div className="buttons">
                        <Button
                            variant="outlined"
                            color="error"
                            endIcon={<CancelOutlinedIcon />}
                            onClick={() => {
                                setEdit(false);
                                setFormData(info);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button variant="outlined" endIcon={<SaveAsOutlinedIcon />} onClick={handleSubmit}>
                            Save
                        </Button>
                    </div>
                    <form className="input-container">
                        <label className="input-item">
                            First Name
                            <TextField
                                required
                                id="standard-required"
                                value={formData?.emergencyContact?.firstName || ""}
                                onChange={handleChange("emergencyContact.firstName")}
                                variant="standard"
                            />
                        </label>
                        <label className="input-item">
                            Middle Name
                            <TextField
                                required
                                id="standard-required"
                                value={formData?.emergencyContact?.middleName || ""}
                                onChange={handleChange("emergencyContact.middleName")}
                                variant="standard"
                            />
                        </label>
                        <label className="input-item">
                            Last Name
                            <TextField
                                required
                                id="standard-required"
                                value={formData?.emergencyContact?.lastName || ""}
                                onChange={handleChange("emergencyContact.lastName")}
                                variant="standard"
                            />
                        </label>
                        <label className="input-item">
                            Phone
                            <TextField
                                required
                                id="standard-required"
                                value={formData?.emergencyContact?.phone || ""}
                                onChange={handleChange("emergencyContact.phone")}
                                variant="standard"
                            />
                        </label>
                        <label className="input-item">
                            Email Address
                            <TextField
                                required
                                id="standard-required"
                                value={formData?.emergencyContact?.email || ""}
                                onChange={handleChange("emergencyContact.email")}
                                variant="standard"
                            />
                        </label>
                        <label className="input-item">
                            Relationship
                            <TextField
                                required
                                id="standard-required"
                                value={formData?.emergencyContact?.relationship || ""}
                                onChange={handleChange("emergencyContact.relationship")}
                                variant="standard"
                            />
                        </label>
                    </form>
                </>
            ) : (
                <>
                    <div className="buttons">
                        <Button variant="outlined" endIcon={<DriveFileRenameOutlineOutlinedIcon />} onClick={() => setEdit(true)}>
                            Edit
                        </Button>
                    </div>
                    <div className="view-container">
                        <label className="view-item">
                            First Name
                            <span>{info?.emergencyContact?.firstName}</span>
                        </label>
                        <label className="view-item">
                            Middle Name
                            <span>{info?.emergencyContact?.middleName}</span>
                        </label>
                        <label className="view-item">
                            Last Name
                            <span>{info?.emergencyContact?.lastName}</span>
                        </label>
                        <label className="view-item">
                            Phone
                            <span>{info?.emergencyContact?.phone}</span>
                        </label>
                        <label className="view-item">
                            Email
                            <span>{info?.emergencyContact?.email}</span>
                        </label>
                        <label className="view-item">
                            Relationship
                            <span>{info?.emergencyContact?.relationship}</span>
                        </label>
                    </div>
                </>
            )}
        </div>
    );
};

const DocumentSection = ({ info, userId }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(info);
    const [edit, setEdit] = useState(false);
    const handleChange = (key) => {
        return (event) => {
            const value = event.target.value;
            setFormData((prev) => ({ ...prev, [key]: value }));
        };
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateEmployeeInfo({ userId, updateData: formData }));
        setEdit(false);
    };

    return (
        <div className="outlined-container">
            <div className="title">Personal Information</div>
            {edit ? (
                <>
                    <div className="buttons">
                        <Button
                            variant="outlined"
                            color="error"
                            endIcon={<CancelOutlinedIcon />}
                            onClick={() => {
                                setEdit(false);
                                setFormData(info);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button variant="outlined" endIcon={<SaveAsOutlinedIcon />} onClick={handleSubmit}>
                            Save
                        </Button>
                    </div>
                    <form className="input-container">
                        <label className="input-item">
                            First Name
                            <TextField
                                required
                                id="standard-required"
                                value={formData?.firstName || ""}
                                onChange={handleChange("firstName")}
                                variant="standard"
                            />
                        </label>
                    </form>
                </>
            ) : (
                <>
                    <div className="buttons">
                        <Button variant="outlined" endIcon={<DriveFileRenameOutlineOutlinedIcon />} onClick={() => setEdit(true)}>
                            Edit
                        </Button>
                    </div>
                    <div className="view-container">
                        <label className="view-item">
                            First Name
                            <span>{info?.firstName}</span>
                        </label>
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;
