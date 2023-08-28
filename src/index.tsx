import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Button, Modal, Form, Input } from 'antd';
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
        <Form
          name="basic"
          layout="vertical"
          labelCol={{ span: 16 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleSubmit(onSubmit)}
          onFinishFailed={() => console.log('failed')}
          autoComplete="off"
        >
          <Controller
            name={"firstName"}
            control={control}
            render={({ field }) => {
              return (
                <Form.Item
                  label="First Name"
                  name="First Name"
                  rules={[{ required: true, message: errors.firstName?.message }, { max: 80 }]}
                >
                  <Input type="text" placeholder="First name"  {...field} />
                </Form.Item>
              )
            }}
          />

          <Controller
            name={"lastName"}
            control={control}
            render={({ field }) => {
              return (
                <Form.Item
                  label="Last Name"
                  name="Last Name"
                  rules={[{ required: true, message: errors.lastName?.message }, { max: 100 }]}
                >
                  <Input type="text" placeholder="Last name"  {...field} />
                </Form.Item>
              )
            }}
          />

          <Controller
            name={"email"}
            control={control}
            render={({ field }) => {
              return (
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Please enter your email' }, { pattern: /^\S+@\S+$/i, message: "Email is not properly formated" }]}
                >
                  <Input type="text" placeholder="Email"  {...field} />
                </Form.Item>
              )
            }}
          />
          <br></br>
          <Controller
            name={"states"}
            control={control}
            render={({ field }) => {
              return (
                <Form.Item
                  label="What state do you live in?"
                  name="state"
                  rules={[{ required: true, message: "Please selcet what state you live in." }]}
                >
                  <Select
                    {...field}
                    options={[{ value: "AL:Alabama", label: "Alabama" },
                    { value: "AK:Alaska", label: "Alaska" },
                    { value: "AZ:Arizona", label: "Arizona" },
                    { value: "AR:Arkansas", label: "Arkansas" },
                    { value: "CA:California", label: "California" },
                    { value: "CO:Colorado", label: "Colorado" },
                    { value: "CT:Connecticut", label: "Connecticut" },
                    { value: "DE:Delaware", label: "Delaware" },
                    { value: "FL:Florida", label: "Florida" },
                    { value: "GA:Georgia", label: "Georgia" },
                    { value: "HI:Hawaii", label: "Hawaii" },
                    { value: "ID:Idaho", label: "Idaho" },
                    { value: "IL:Illinois", label: "Illinois" },
                    { value: "IN:Indiana", label: "Indiana" },
                    { value: "IA:Iowa", label: "Iowa" },
                    { value: "KS:Kansas", label: "Kansas" },
                    { value: "KY:Kentucky", label: "Kentucky" },
                    { value: "LA:Louisiana", label: "Louisiana" },
                    { value: "ME:Maine", label: "Maine" },
                    { value: "MD:Maryland", label: "Maryland" },
                    { value: "MA:Massachusetts", label: "Massachusetts" },
                    { value: "MI:Michigan", label: "Michigan" },
                    { value: "MN:Minnesota", label: "Minnesota" },
                    { value: "MS:Mississippi", label: "Mississippi" },
                    { value: "MO:Missouri", label: "Missouri" },
                    { value: "MT:Montana", label: "Montana" },
                    { value: "NE:Nebraska", label: "Nebraska" },
                    { value: "NV:Nevada", label: "Nevada" },
                    { value: "NH:NewHampshire", label: "NewHampshire" },
                    { value: "NJ:NewJersey", label: "New Jersey" },
                    { value: "NM:NewMexico", label: "New Mexico" },
                    { value: "NY:NewYork", label: "New York" },
                    { value: "NC:NorthCarolina", label: "North Carolina" },
                    { value: "ND:NorthDakota", label: "North Dakota" },
                    { value: "OH:Ohio", label: "Ohio" },
                    { value: "OK:Oklahoma", label: "Oklahoma" },
                    { value: "OR:Oregon", label: "Oregon" },
                    { value: "PA:Pennsylvania", label: "Pennsylvania" },
                    { value: "RI:RhodeIsland", label: "Rhode Island" },
                    { value: "SC:SouthCarolina", label: "South Carolina" },
                    { value: "SD:SouthDakota", label: "South Dakota" },
                    { value: "TN:Tennessee", label: "Tennessee" },
                    { value: "TX:Texas", label: "Texas" },
                    { value: "UT:Utah", label: "Utah" },
                    { value: "VT:Vermont", label: "Vermont" },
                    { value: "VA:Virginia", label: "Virginia" },
                    { value: "WA:Washington", label: "Washington" },
                    { value: "WV:WestVirginia", label: "West Virginia" },
                    { value: "WI:Wisconsin", label: "Wisconsin" },
                    { value: "WY:Wyoming", label: "Wyoming" },]}
                    placeholder="Please select the state you live in"
                  />
                </Form.Item>
              )
            }}
          />

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>

        </Form>
      </Modal>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
