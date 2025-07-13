import { Card, Col, Form, Input, Row } from "antd"
export const AddressForm = () => {
    return (
        <Card title="Address Detail">
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Address 1"
                        name="address1"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="input address 1" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Address 2"
                        name="address2"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="input address 1" />
                    </Form.Item>
                </Col>
            </Row>

            {/* Row 2 */}
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Area/District"
                        name="district"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="input distinct" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Province"
                        name="province"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="input province" />
                    </Form.Item>
                </Col>
            </Row>

            {/* Row 3 */}
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Home Zip Code"
                        name="zipcode"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Enter zip code" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Telephone Number"
                        name="telNumber"
                    >
                        <Input placeholder="Enter telephone number" maxLength={10} />
                    </Form.Item>
                </Col>
            </Row>

            {/* Final input alone (Input 7) */}
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Extension Number"
                        name="extNumber"
                    >
                        <Input placeholder="Enter extension number" maxLength={10} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Fax"
                        name="faxNumber"
                    >
                        <Input placeholder="Enter fax number" maxLength={10} />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    )
}