export default class Api {
    /**
     * Axios instance
     */
    axios;

    /**
     * Constructor
     *
     * @param axiosInstance
     */
    constructor(axiosInstance) {
        this.axios = axiosInstance;
    }

    /**
     * Get shippers
     *
     * @returns {Promise<*>}
     */
    getShippers = async () => {
        return this.axios.get('/shippers');
    };

    /**
     * Add a shipper
     *
     * @param data
     * @returns {Promise<*>}
     */
    addShipper = async (data) => {
        return this.axios.post('/shippers', data);
    };

    /**
     * Update a shipper
     *
     * @param shipperId
     * @param data
     * @returns {Promise<*>}
     */
    updateShipper = async (shipperId, data) => {
        return this.axios.patch(`/shippers/${shipperId}`, data);
    };

    /**
     * Get a shipper
     *
     * @param shipperId
     * @returns {Promise<*>}
     */
    getShipper = async (shipperId) => {
        return this.axios.get(`/shippers/${shipperId}/contacts`);
    };

    /**
     * Add a contact
     *
     * @param shipperId
     * @param data
     * @returns {Promise<*>}
     */
    addContact = async (shipperId, data) => {
        return this.axios.post(`/shippers/${shipperId}/contacts`, data);
    };

    /**
     * Delete a contact
     *
     * @param shipperId
     * @param contactId
     * @returns {Promise<*>}
     */
    deleteContact = async (shipperId, contactId) => {
        return this.axios.delete(`/shippers/${shipperId}/contacts/${contactId}`);
    };

    /**
     * Pick a contact as primary
     *
     * @param shipperId
     * @param contactId
     * @returns {Promise<*>}
     */
    pickContactAsPrimary = async (shipperId, contactId) => {
        return this.axios.patch(`/shippers/${shipperId}/contacts/${contactId}/pick-as-primary`);
    };
}