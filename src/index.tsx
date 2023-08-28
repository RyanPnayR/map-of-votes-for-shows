import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Button, Modal } from 'antd';
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Select from 'react-select';

import "./styles.css";

import MapChart from "./MapChart";
interface SelectField {
  firstName: string,
  lastName: string,
  email: string,
  states: { value: string, label: string },
}
const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    states: yup.object({
      value: yup.string().required("Please select your state"),
    }),
  })
  .required()
function App() {
  const [open, setIsModalOpen] = useState(false);

  const { control, register, handleSubmit, formState: { errors, defaultValues } } = useForm<SelectField>({
    resolver: yupResolver(schema),
  });
  const onSubmit = data => console.log(data);
  console.log(defaultValues)
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <div>
      <MapChart />
      <Button type="primary" onClick={showModal}>
        Click here to tell me
      </Button>
      <Modal
        title="Where Can I make You smile?"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: true }}
        cancelButtonProps={{ disabled: true }}
        footer={null}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="First name" {...register("firstName", { required: true, maxLength: 80 })} />
          <p>{errors.firstName?.message}</p>

          <input type="text" placeholder="Last name" {...register("lastName", { required: true, maxLength: 100 })} />
          <p>{errors.lastName?.message}</p>

          <br></br>
          <input type="text" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
          <p>{errors.email?.message}</p>

          <br></br>
          <Controller
            name={"states"}
            control={control}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  options={[{value: "AL:Alabama", label:"Alabama"},
                  {value: "AK:Alaska", label:"Alaska"},
                  {value: "AZ:Arizona", label:"Arizona"},
                  {value: "AR:Arkansas", label:"Arkansas"},
                  {value: "CA:California", label:"California"},
                  {value: "CO:Colorado", label:"Colorado"},
                  {value: "CT:Connecticut", label:"Connecticut"},
                  {value: "DE:Delaware", label:"Delaware"},
                  {value: "FL:Florida", label:"Florida"},
                  {value: "GA:Georgia", label:"Georgia"},
                  {value: "HI:Hawaii", label:"Hawaii"},
                  {value: "ID:Idaho", label:"Idaho"},
                  {value: "IL:Illinois", label:"Illinois"},
                  {value: "IN:Indiana", label:"Indiana"},
                  {value: "IA:Iowa", label:"Iowa"},
                  {value: "KS:Kansas", label:"Kansas"},
                  {value: "KY:Kentucky", label:"Kentucky"},
                  {value: "LA:Louisiana", label:"Louisiana"},
                  {value: "ME:Maine", label:"Maine"},
                  {value: "MD:Maryland", label:"Maryland"},
                  {value: "MA:Massachusetts", label:"Massachusetts"},
                  {value: "MI:Michigan", label:"Michigan"},
                  {value: "MN:Minnesota", label:"Minnesota"},
                  {value: "MS:Mississippi", label:"Mississippi"},
                  {value: "MO:Missouri", label:"Missouri"},
                  {value: "MT:Montana", label:"Montana"},
                  {value: "NE:Nebraska", label:"Nebraska"},
                  {value: "NV:Nevada", label:"Nevada"},
                  {value: "NH:NewHampshire", label:"NewHampshire"},
                  {value: "NJ:NewJersey", label:"New Jersey"},
                  {value: "NM:NewMexico", label:"New Mexico"},
                  {value: "NY:NewYork", label:"New York"},
                  {value: "NC:NorthCarolina", label:"North Carolina"},
                  {value: "ND:NorthDakota", label:"North Dakota"},
                  {value: "OH:Ohio", label:"Ohio"},
                  {value: "OK:Oklahoma", label:"Oklahoma"},
                  {value: "OR:Oregon", label:"Oregon"},
                  {value: "PA:Pennsylvania", label:"Pennsylvania"},
                  {value: "RI:RhodeIsland", label:"Rhode Island"},
                  {value: "SC:SouthCarolina", label:"South Carolina"},
                  {value: "SD:SouthDakota", label:"South Dakota"},
                  {value: "TN:Tennessee", label:"Tennessee"},
                  {value: "TX:Texas", label:"Texas"},
                  {value: "UT:Utah", label:"Utah"},
                  {value: "VT:Vermont", label:"Vermont"},
                  {value: "VA:Virginia", label:"Virginia"},
                  {value: "WA:Washington", label:"Washington"},
                  {value: "WV:WestVirginia", label:"West Virginia"},
                  {value: "WI:Wisconsin", label:"Wisconsin"},
                  {value: "WY:Wyoming", label:"Wyoming"},]}
                  placeholder="Please select the state you live in"
                />
              )
            }}
          />

          <p>{errors.states?.value?.message}</p>

          <br></br>
          <input type="Submit" value="Submit" />
        </form>
      </Modal>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
