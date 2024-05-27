import "./home.css";
import { GoogleSearch } from "../../ui/AutocompleteInput";
import { searchSchema, searchSchemaType } from "../../../schema/search-zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export default function Home() {
  type SpecialistType = {
    name: string;
    email: string;
    phone: string;
    place: string;
  };
  type NearesSpType = SpecialistType[];

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<searchSchemaType>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      address: "",
      lat: 0,
      lng: 0,
      role: "mechanic",
    },
  });

  const [nearestSp, setNearnestSp] = useState<NearesSpType>([]);

  const onHandleSubmit = async (data: searchSchemaType) => {
    console.log(data);
    const nearestSpecialistRes = await fetch(
      `http://localhost:8080/specialist/nearest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.role,
          lat: data.lat,
          lng: data.lng,
        }),
      }
    );
    const body = await nearestSpecialistRes.json();
    setNearnestSp(body);
  };
  return (
    <>
      <div className="app__hero">
        <img
          id="hero-img-1"
          src="./plumber_one.svg"
          alt="hero_plumber"
          style={{ width: "300px", height: "300px" }}
        />
        <div className="app__hero-desc">
          <h1>Bringing Professionals Closer to You</h1>

          <div className="app__hero-logo">
            <h2>
              Proximity<span style={{ color: "skyblue" }}>Pro</span>
            </h2>
          </div>
          <div>
            <form onSubmit={handleSubmit(onHandleSubmit)}>
              <GoogleSearch
                onSelectAddress={(address, lat, lng) => {
                  if (lat && lng) {
                    setValue("address", address);
                    setValue("lat", lat);
                    setValue("lng", lng);
                  }
                }}
              />
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <select
                    id="role"
                    name="role"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <option value={"mechanic"}>Mechanic</option>
                    <option value={"painter"}>Painter</option>
                    <option value={"plumber"}>Plumber</option>
                    <option value={"cleaner"}>Cleaner</option>
                    <option value={"worker"}>Worker</option>
                    <option value={"electrician"}>Electrician</option>
                  </select>
                )}
              />
              <button id="register">Go</button>
            </form>
          </div>
        </div>
        <img
          id="hero-img-2"
          src="./plumber.svg"
          alt="hero_plumber"
          style={{ width: "300px", height: "300px" }}
        />
      </div>
      {nearestSp.map((data, idx) => (
        <div key={idx}>
          <p>
            name:<span>{data.name}</span>
          </p>
          <p>
            <p>
              email:<span>{data.email}</span>
            </p>
            phone:<span>{data.phone}</span>
            place:<span>{data.place}</span>
          </p>
        </div>
      ))}
    </>
  );
}
