# 🌱 Contributing to EcoConnect

Cảm ơn bạn đã quan tâm đến việc đóng góp cho EcoConnect! Chúng tôi hoan nghênh mọi đóng góp từ cộng đồng.

## 📋 Mục lục

- [Code of Conduct](#code-of-conduct)
- [Cách đóng góp](#cách-đóng-góp)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)

## Code of Conduct

Dự án này tuân theo Code of Conduct. Bằng cách tham gia, bạn cam kết tôn trọng quy tắc này.

## Cách đóng góp

### 1. Fork Repository
```bash
# Fork qua GitHub UI
# Clone fork về máy local
git clone https://github.com/YOUR_USERNAME/ecoconnect.git
cd ecoconnect

# Add upstream remote
git remote add upstream https://github.com/ecoconnect/ecoconnect.git
```

### 2. Tạo Branch mới
```bash
# Sync với upstream
git fetch upstream
git checkout main
git merge upstream/main

# Tạo feature branch
git checkout -b feature/your-feature-name
# hoặc
git checkout -b fix/your-bug-fix
```

### 3. Make Changes
- Viết code clean và có comments
- Tuân theo coding standards
- Thêm tests cho code mới
- Update documentation nếu cần

### 4. Commit Changes
```bash
git add .
git commit -m "feat: add new feature"
```

**Commit Message Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: Tính năng mới
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Example:**
```
feat(marketplace): add filter by ESG score

- Add ESG score slider in filter panel
- Update API to support ESG filtering
- Add unit tests for new filter

Closes #123
```

### 5. Push và Create Pull Request
```bash
git push origin feature/your-feature-name
```

Sau đó tạo Pull Request trên GitHub với mô tả chi tiết.

## Development Setup

Xem [README.md](../README.md) để biết hướng dẫn chi tiết setup môi trường development.

## Coding Standards

### JavaScript/TypeScript

**ESLint Configuration:**
```javascript
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals"
  ],
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  }
}
```

**Best Practices:**
- Use TypeScript types
- Prefer `const` over `let`
- Use arrow functions
- Async/await over promises
- Meaningful variable names
- Keep functions small and focused

**Example:**
```typescript
// ✅ Good
const fetchProducts = async (filters: ProductFilters): Promise<Product[]> => {
  const response = await api.get('/products', { params: filters });
  return response.data;
};

// ❌ Bad
function fetchProducts(f) {
  return api.get('/products', { params: f }).then(r => r.data);
}
```

### Python

**Style Guide:** PEP 8

**Tools:**
- Black (formatter)
- Flake8 (linter)
- MyPy (type checking)

```python
# Format code
black .

# Lint
flake8 .

# Type check
mypy .
```

### Solidity

**Style Guide:** Solidity Style Guide

```solidity
// ✅ Good: Clear naming, comments, events
contract GreenProductPassport {
    /// @notice Mint new product passport
    /// @param to Address to receive NFT
    /// @param productId Product identifier
    function mintPassport(
        address to,
        string memory productId
    ) external returns (uint256) {
        // Implementation
    }
}
```

## Pull Request Process

### Before Submitting

- [ ] Code compiles without errors
- [ ] All tests pass
- [ ] Linter passes
- [ ] Documentation updated
- [ ] Commit messages follow convention
- [ ] Branch is up to date with main

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing performed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
```

### Review Process

1. **Automated Checks**: CI/CD pipeline runs tests
2. **Code Review**: At least 1 approval required
3. **Testing**: Reviewer tests functionality
4. **Merge**: Squash and merge to main

## Reporting Bugs

### Before Reporting

1. Check existing issues
2. Try latest version
3. Gather debug information

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable

**Environment:**
 - OS: [e.g. Windows 10]
 - Browser: [e.g. Chrome 120]
 - Version: [e.g. 1.0.0]

**Additional context**
Any other relevant information
```

## Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of what you want to happen

**Describe alternatives you've considered**
Other solutions you've thought about

**Additional context**
Mockups, examples, etc.
```

## Testing

### Running Tests

```bash
# Backend
cd backend-api && npm test

# Frontend
cd frontend-web && npm test

# AI Service
cd ai-service && pytest

# Blockchain
cd blockchain && npm test
```

### Writing Tests

**Unit Tests:**
```typescript
describe('ProductService', () => {
  it('should create a product', async () => {
    const product = await productService.create(mockProductData);
    expect(product).toBeDefined();
    expect(product.name).toBe('Test Product');
  });
});
```

**Integration Tests:**
```typescript
describe('GET /api/products', () => {
  it('should return products list', async () => {
    const response = await request(app)
      .get('/api/products')
      .expect(200);
    
    expect(response.body.data).toBeInstanceOf(Array);
  });
});
```

## Documentation

### Code Documentation

**JSDoc for TypeScript:**
```typescript
/**
 * Calculate carbon footprint for a product
 * @param product - Product data
 * @param transportDistance - Distance in km
 * @returns Carbon footprint in kg CO2e
 */
function calculateCarbonFootprint(
  product: Product,
  transportDistance: number
): number {
  // Implementation
}
```

**Docstrings for Python:**
```python
def optimize_route(origin: Location, destinations: List[Location]) -> Route:
    """
    Optimize delivery route using TSP algorithm.
    
    Args:
        origin: Starting location
        destinations: List of delivery locations
        
    Returns:
        Optimized route with carbon savings
        
    Raises:
        ValueError: If destinations list is empty
    """
    pass
```

### API Documentation

Update `docs/API.md` khi thêm/thay đổi endpoints.

## Questions?

- 💬 Discord: https://discord.gg/ecoconnect
- 📧 Email: developers@ecoconnect.vn
- 📖 Docs: https://docs.ecoconnect.vn

Cảm ơn bạn đã đóng góp! 🌱
