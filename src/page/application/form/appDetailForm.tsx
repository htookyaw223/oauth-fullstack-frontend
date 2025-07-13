import { Card, Col, DatePicker, Form, Input, Row, Select, Typography } from "antd"
import { isValidThaiID } from "../../../utils";
import dayjs from "dayjs";

export const ApplicationForm = () => {

    const validateID = (_: any, value: string) => {
        if (!value) {
            return Promise.reject(new Error("Please enter your ID number"));
        }
        if (!/^\d{13}$/.test(value)) {
            return Promise.reject(new Error("ID must be exactly 13 digits"));
        }
        if (!isValidThaiID(value)) {
            return Promise.reject(new Error("Invalid Thai ID number"));
        }
        return Promise.resolve();
    };

    return (
        <Card title="Application detail">
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Application number"
                        name="applicationNo"
                    >
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Date of Application Completion"
                        name="applicationDate"
                        initialValue={dayjs()}
                    >
                        <DatePicker disabled />
                    </Form.Item>
                </Col>
            </Row>

            {/* Row 2 */}
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Application type"
                        name="applicationType"
                    >
                        <Select
                            options={[
                                {
                                    value: "A",
                                    label: "A",
                                },
                                {
                                    value: "B",
                                    label: "B",
                                },
                                {
                                    value: "C",
                                    label: "C",
                                },
                            ]}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Identification card"
                        name="idType"
                        rules={[{ required: true }]}
                        initialValue={"ID card"}
                    >
                        <Select
                            options={[
                                {
                                    value: "ID card",
                                    label: "ID card",
                                },
                            ]}
                        />
                    </Form.Item>
                </Col>
            </Row>

            {/* Row 3 */}
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Identification Number"
                        name="idNo"
                        rules={[{ validator: validateID, required: true }]}
                    >
                        <Input placeholder="Enter Identification Number" maxLength={13} minLength={13} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Expired date"
                        name="expireDate"
                        rules={[{ required: true }]}
                    >
                        <DatePicker
                            format="DD/MM/YYYY"
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    )
}