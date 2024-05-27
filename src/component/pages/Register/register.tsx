import { useForm } from "react-hook-form";
import {
  RegisterSchema,
  RegisterSchemaType,
} from "../../../schema/register-zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleSearch } from "../../ui/AutocompleteInput";

const Register = () => {
  type roleType = {
    name: string;
  };
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      place: "",
      lat: 0,
      lng: 0,
      role: [],
    },
  });

  const handleCheckboxChange = (role: string) => {
    const prev = getValues("role");
    prev.includes(role)
      ? setValue(
          "role",
          prev.filter((ro) => ro != role)
        )
      : setValue("role", [...prev, role]);
  };
  const onHandleSubmit = async (data: RegisterSchemaType) => {
    console.log(data);
    const roles: roleType[] = [];
    data.role.forEach((data) => {
      roles.push({
        name: data,
      });
    });
    console.log(roles);
    const response = await fetch("http://localhost:8080/specialist/put", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        place: data.place,
        lat: data.lat,
        lng: data.lng,
        roles: roles,
      }),
    });

    if (response.ok) {
      console.log("inserted specialist");
    } else {
      console.log("something went wrong");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <input placeholder="John Doe" {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}
        <input placeholder="johndoe@example.com" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}

        <GoogleSearch
          onSelectAddress={(address, lat, lng) => {
            if (lat && lng) {
              setValue("place", address);
              setValue("lat", lat);
              setValue("lng", lng);
            }
          }}
        />
        {errors.place && <span>{errors.place.message}</span>}
        {errors.lat && <span>{errors.lat.message}</span>}
        {errors.lng && <span>{errors.lng.message}</span>}
        <input placeholder="+91933922312" {...register("phone")} />
        {errors.phone && <span>{errors.phone.message}</span>}

        <div id="role-checkbox">
          <label>
            <input
              type="checkbox"
              value="painter"
              onChange={() => handleCheckboxChange("painter")}
            />
            Painter
          </label>
          <label>
            <input
              type="checkbox"
              value="mechanic"
              onChange={() => handleCheckboxChange("mechanic")}
            />
            Mechanic
          </label>
          <label>
            <input
              type="checkbox"
              value="cleaner"
              onChange={() => handleCheckboxChange("cleaner")}
            />
            Cleaner
          </label>
          <label>
            <input
              type="checkbox"
              value="worker"
              onChange={() => handleCheckboxChange("worker")}
            />
            Worker
          </label>
          <label>
            <input
              type="checkbox"
              value="electrician"
              onChange={() => handleCheckboxChange("electrician")}
            />
            Electrician
          </label>
          <label>
            <input
              type="checkbox"
              value="plumber"
              onChange={() => handleCheckboxChange("plumber")}
            />
            Plumber
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
