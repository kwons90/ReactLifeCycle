const URL_Products = 'https://acme-users-api-rev.herokuapp.com/api/products';
const URL_Companies = 'https://acme-users-api-rev.herokuapp.com/api/companies';

const {Component} = React
const e = React.createElement;

const app = document.querySelector('#app')

const productsPromise = axios.get(URL_Products)
.then(res => {
    console.log(res.data)
    return (res.data)
    })
const companiesPromise = axios.get(URL_Companies)
.then(res => {
    console.log(res.data)
    return (res.data)
    })  

// class Nav extends Component {
//     render() {
//         const {products, companies, hash} = this.props;
//         return e('button',app,`Products ${products.length}`
//         e('button',app,`Companies ${companies.legnth}`

// }


class App extends Component {
    state = {
        products: [],
        companies: [],
        hash: 'companies'
    }
    componentDidMount() {
        console.log(this.state.products)
        window.addEventListener('hashchange', (ev) => {
            this.setState({
                hash: window.location.hash.slice(1)
            })
        })
        Promise.all([productsPromise, companiesPromise])
            .then(response => {
            console.log(response[0])
            this.setState( {
                products: response[0],
                companies: response[1]
            })
        })
    }

    render() {
        const {products, companies, hash} = this.state
        return e('div', null, 
            e(ProductsLink, {products, hash}), 
            e(CompaniesLink, {companies, hash}), 
            e(List, {products, companies, hash}))
    }
}

class ProductsLink extends Component {
    render(){
        const {products, hash} = this.props;
        return e('a', {href: '#products', hash}, `Products (${products.length})`)
    }
}

class CompaniesLink extends Component {
    render(){
        const {companies, hash} = this.props;
        return e('a', {href: '#companies', hash}, `Companies (${companies.length})`)
    }
}

class List extends Component {
    render() {
        const {products, companies, hash} = this.props;
        let ulContainer;
        let list = []
        console.log(this.state)
        if(hash === 'products') {
            for(i in products) {
                console.log(products[i].name)
                list.push(e('li',null,product[i].name))
            }
        if(hash == 'companies') {
            for(i in companies) {
                list.push(e('li',null,companies[i].name))
            }    
        }
        ulContainer = e('ul', null, ...list)
        return ulContainer;
        }
    }
}

ReactDOM.render(e(App), app, ()=>{console.log('I have rendered')});