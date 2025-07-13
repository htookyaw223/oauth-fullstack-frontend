import { Card, Col, DatePicker, Form, Input, InputNumber, Radio, Row, Select, Typography } from "antd"

export const CAForm = () => {
    return (
        <Card style={{ marginTop: 20 }} title="Credit Analyst">
            {/* Row 1 */}
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Name (English)"
                        name="firstnameEn"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Enter name" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Surname (English)"
                        name="lastnameEn"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Enter surname" />
                    </Form.Item>
                </Col>
            </Row>

            {/* Row 2 */}
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Name (Thai)"
                        name="firstnameTh"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Enter first name (thai)" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Surname (Thai)"
                        name="lastnameTh"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Enter last name (thai)" />
                    </Form.Item>
                </Col>
            </Row>

            {/* Row 3 */}
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Birth Date"
                        name="birthDate"
                        rules={[{ required: true }]}
                    >
                        <DatePicker
                            format="DD/MM/YYYY"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Sex"
                        name="gender"
                        rules={[{ required: true }]}
                    >
                        <Radio.Group
                            options={[{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' },]}
                            defaultValue="Male"
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Place of sending document"
                        name="locationType"
                        rules={[{ required: true }]}
                    >
                        <Select
                            options={[
                                {
                                    value: "Home",
                                    label: "Home",
                                },
                                {
                                    value: "Office",
                                    label: "Office",
                                },
                            ]}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Mobile number"
                        name="mobileNumber"
                    >
                        <Input placeholder="Enter mobile number" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Open to other service offer"
                        name="optional"
                        rules={[{ required: true }]}
                    >
                        <Radio.Group
                            options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' },]}
                            defaultValue="Yes"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Position"
                        name="positionType"
                    >
                        <Select
                            placeholder="-please-choose--"
                            options={[
                                {
                                    value: "Manager",
                                    label: "Manager",
                                },
                                {
                                    value: "Accountant",
                                    label: "Accountant",
                                },
                                {
                                    value: "Developer",
                                    label: "Developer",
                                },
                                {
                                    value: "Office staff",
                                    label: "Office staff",
                                },
                            ]}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Work Type"
                        name="jobType"
                        rules={[{ required: true }]}
                    >
                        <Select
                            placeholder="-please-choose--"
                            options={[
                                {
                                    value: "Full Time",
                                    label: "Full Time",
                                },
                                {
                                    value: "Part Time",
                                    label: "Part Time",
                                },
                            ]}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Current employment period (years)"
                        name="workYear"
                    >
                        <InputNumber min={1} max={50} style={{ width: '100%' }} placeholder="employment year" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Current employment period (months)"
                        name="workMonth"
                    >
                        <InputNumber min={1} max={12} style={{ width: '100%' }} placeholder="employment months" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Income"
                        name="incomeYear"
                        rules={[{ required: true }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} placeholder="input yearly income" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Monthly Income"
                        name="incomeMonth"
                    >
                        <InputNumber min={0} style={{ width: '100%' }} placeholder="input monthly income" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Residence"
                        name="residence"
                    >
                        <Select
                            placeholder="-please-choose--"
                            options={[
                                {
                                    value: "Own",
                                    label: "Own",
                                },
                                {
                                    value: "Rent",
                                    label: "Rent",
                                },
                            ]}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Number of persons on duty"
                        name="workMonth"
                    >
                        <InputNumber min={1} max={99} style={{ width: '100%' }} placeholder="number of persons" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Marital Status"
                        name="maritalType"
                        rules={[{ required: true }]}
                    >
                        <Select
                            placeholder="-please-choose--"
                            options={[
                                {
                                    value: "Single",
                                    label: "Single",
                                },
                                {
                                    value: "Married",
                                    label: "Married",
                                },
                            ]}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    )
}